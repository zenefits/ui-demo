import React, { Component, ReactChild, ReactElement } from 'react';

const DragAndDropContext = (React as any).createContext();

interface DragSourceProps {
  /**
   * Data about the drag source
   */
  data: any;

  /**
   * Children is a single element
   */
  children: ReactElement<any>;
}

/**
 * A wrapper component to define a drag source
 */
class DragSource extends Component<DragSourceProps, {}> {
  render() {
    const { children, data: source } = this.props;
    return (
      <DragAndDropContext.Consumer>
        {({ setSource }: any) =>
          React.cloneElement(children, {
            draggable: true,
            onDragStart: (e: any) => {
              /**
               * To make it work in Firefox, we have to set some data, e.g. 'foo'
               * https://stackoverflow.com/questions/3977596/how-to-make-divs-in-html5-draggable-for-firefox
               *
               * Data must be string type
               * https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setData
               */
              e.dataTransfer.setData('text/plain', 'foo');
              setSource(source);
            },
            onDragEnd: () => {
              setSource(null);
            },
          })
        }
      </DragAndDropContext.Consumer>
    );
  }
}

interface DropTargetProps {
  /**
   * Data about the drop target
   */
  data: any;

  /**
   * Children is a single element
   */
  children: ReactElement<any>;
}

/**
 * A wrapper component to define a drag target
 */
class DropTarget extends Component<DropTargetProps, {}> {
  render() {
    const { children, data: target } = this.props;
    return (
      <DragAndDropContext.Consumer>
        {({ onDrop, setTarget, source }: any) =>
          React.cloneElement(children, {
            /**
             * By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default
             * handling of the element. This is done by calling the event.preventDefault() method for the ondragover
             * attribute.
             */
            onDragOver: (e: any) => e.preventDefault(),
            onDrop: (e: any) => {
              /**
               * Call the preventDefault() method of the event so that the default browser handling does not handle the
               * dropped data as well.
               * For example, Firefox will open a link. By cancelling the event, this behavior will be prevented.
               * https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/Drag_operations#dragdata
               */
              e.preventDefault();
              onDrop(source, target);
            },
          })
        }
      </DragAndDropContext.Consumer>
    );
  }
}

interface DragAndDropProps {
  /**
   * A drop event handler
   */
  onDrop: (source: any, target: any) => void;

  /**
   * Children is a render prop
   */
  children: () => ReactChild;
}

interface DragAndDropState {
  /**
   * Data for source
   */
  source: any;

  /**
   * Data for target
   */
  target: any;
}

class DragAndDrop extends Component<DragAndDropProps, DragAndDropState> {
  constructor(props: DragAndDropProps) {
    super(props);
    this.state = {
      source: null,
      target: null,
    };
  }

  static Source = DragSource;
  static Target = DropTarget;

  render() {
    const contextValue = {
      source: this.state.source,
      onDrop: this.props.onDrop,
      setSource: (source: any) => {
        this.setState({ source });
      },
    };

    return <DragAndDropContext.Provider value={contextValue}>{this.props.children()}</DragAndDropContext.Provider>;
  }
}

export default DragAndDrop;
