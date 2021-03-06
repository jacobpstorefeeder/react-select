// @flow

import React, { Component, type ComponentType, type ElementRef } from 'react';
import Select, { type Props as SelectProps } from './Select';
import { handleInputChange } from './utils';
import manageState from './stateManager';
import type { OptionsType, InputActionMeta } from './types';

export type AsyncProps = {
  /* The default set of options to show before the user starts searching. When
     set to `true`, the results for loadOptions('') will be autoloaded. */
  defaultOptions: OptionsType | boolean,
  /* Function that returns a promise, which is the set of options to be used
     once the promise resolves. */
  loadOptions: (string, (OptionsType) => void) => Promise<*> | void,
  /* If cacheOptions is truthy, then the loaded data will be cached. The cache
     will remain until `cacheOptions` changes value. */
  cacheOptions: any,
  loadOptionsPagination: (string, (OptionsType) => void, currentPage: number) => Promise<*> | void
};

export type Props = SelectProps & AsyncProps;

export const defaultProps = {
  cacheOptions: false,
  defaultOptions: false,
};

type State = {
  defaultOptions?: OptionsType,
  inputValue: string,
  isLoading: boolean,
  loadedInputValue?: string,
  loadedOptions: OptionsType,
  passEmptyOptions: boolean,
  currentPage: number,
  paginationLoadedMoreResults: boolean
};

export const makeAsyncSelect = (SelectComponent: ComponentType<*>) =>
  class Async extends Component<Props, State> {
    static defaultProps = defaultProps;
    select: ElementRef<*>;
    lastRequest: {};
    mounted: boolean = false;
    optionsCache: { [string]: OptionsType } = {};

    constructor(props: Props) {
      super(props);
      this.state = {
        defaultOptions: Array.isArray(props.defaultOptions)
          ? props.defaultOptions
          : undefined,
        inputValue: props.inputValue,
        isLoading: props.defaultOptions === true ? true : false,
        loadedOptions: [],
        passEmptyOptions: false,
        currentPage: 1,
        paginationLoadedMoreResults: false
      };
    }

    componentDidMount() {
      this.mounted = true;
      const { defaultOptions } = this.props;
      const { inputValue } = this.state;
      if (defaultOptions === true) {
        this.loadOptions(inputValue, options => {
          if (!this.mounted) return;
          const isLoading = !!this.lastRequest;
          this.setState({ defaultOptions: options || [], isLoading });
        });
      }
    }

    componentWillReceiveProps(nextProps: Props) {
      // if the cacheOptions prop changes, clear the cache
      if (nextProps.cacheOptions !== this.props.cacheOptions) {
        this.optionsCache = {};
      }
      if (nextProps.defaultOptions !== this.props.defaultOptions) {
        this.setState({
          defaultOptions: Array.isArray(nextProps.defaultOptions)
            ? nextProps.defaultOptions
            : undefined,
        });
      }

    }

    componentWillUnmount() {
      this.mounted = false;
    }

    incrementPage = () => {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    }

    decrementPage = () => {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    }

    resetPage = () => {
      this.setState({
        currentPage: 1
      });
    }

    menuHitBottom = () => {
      this.incrementPage();
      this.loadOptions(this.state.inputValue, options => {
        if (!this.mounted) return;
        const newState = {
          isLoading: false,
          passEmptyOptions: false,
          loadedOptions: options || [],
          paginationLoadedMoreResults: true
        };
        this.setState(newState);
      });
    }

    focus() {
      this.select.focus();
    }

    blur() {
      this.select.blur();
    }

    loadOptions(inputValue: string, callback: (?Array<*>) => void) {
      const { loadOptions, loadOptionsPagination } = this.props;
      let loader;
      if (!!loadOptions) {
        loader = loadOptions(inputValue, callback);
      } else if (!!loadOptionsPagination) {
        loader = loadOptionsPagination(inputValue, callback, this.state.currentPage);
      } else {
        return callback();
      }
      if (loader && typeof loader.then === 'function') {
        loader.then(callback, () => callback());
      }
      // if (!loadOptions) return callback();
      // const loader = loadOptions(inputValue, callback);
      // if (loader && typeof loader.then === 'function') {
      //   loader.then(callback, () => callback());
      // }
    }

    handleInputChange = (newValue: string, actionMeta: InputActionMeta) => {
      const { cacheOptions, onInputChange } = this.props;
      // TODO
      const inputValue = handleInputChange(newValue, actionMeta, onInputChange);
      if (!inputValue) {
        delete this.lastRequest;
        this.setState({
          inputValue: '',
          loadedInputValue: '',
          loadedOptions: [],
          isLoading: false,
          passEmptyOptions: false,
          paginationLoadedMoreResults: false
        });
        return;
      }
      if (cacheOptions && this.optionsCache[inputValue]) {
        this.setState({
          inputValue,
          loadedInputValue: inputValue,
          loadedOptions: this.optionsCache[inputValue],
          isLoading: false,
          passEmptyOptions: false,
        });
      } else {
        const request = (this.lastRequest = {});
        this.setState(
          {
            inputValue,
            isLoading: true,
            passEmptyOptions: !this.state.loadedInputValue,
          },
          () => {
            this.loadOptions(inputValue, options => {
              if (!this.mounted) return;
              if (options) {
                this.optionsCache[inputValue] = options;
              }
              if (request !== this.lastRequest) return;
              delete this.lastRequest;
              this.setState({
                isLoading: false,
                loadedInputValue: inputValue,
                loadedOptions: options || [],
                passEmptyOptions: false,
              });
            });
          }
        );
      }
      return inputValue;
    };

    clearStoredResults = () => {
      console.log('clearing stored results');
      this.setState({
        loadedOptions: [],
        paginationLoadedMoreResults: false
      });
    }

    getOptions = () => {
      const {
        defaultOptions,
        inputValue,
        loadedInputValue,
        loadedOptions,
        passEmptyOptions,
        paginationLoadedMoreResults
      } = this.state;

      switch(true) {
        case passEmptyOptions: return [];
        case inputValue && loadedInputValue:
        case paginationLoadedMoreResults: return loadedOptions;
        default: return defaultOptions || [];
      }
    }

    menuClosed = (propsMenuClosed: Function) => {
      propsMenuClosed && propsMenuClosed();
      this.clearStoredResults();
      this.resetPage();
    }

    render() {
      const { loadOptions, ...props } = this.props;
      const { isLoading } = this.state;
      const options = this.getOptions();
      return (
        // $FlowFixMe
        <SelectComponent
          {...props}
          filterOption={this.props.filterOption || null}
          ref={ref => {
            this.select = ref;
          }}
          options={options}
          isLoading={isLoading}
          onInputChange={this.handleInputChange}
          onMenuScrollToBottom={this.menuHitBottom}
          onMenuClose={this.menuClosed.bind(this, this.props.onMenuClose)}
        />
      );
    }
  };

export default makeAsyncSelect(manageState(Select));
