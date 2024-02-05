import * as React from "react";

interface PropertyPanePropsType {
  title: string;
  children: React.ReactNode;
}

export let PropertyPaneProps: PropertyPanePropsType = {
  title: "",
  children: null,
};

export class PropertyPane extends React.Component<PropertyPanePropsType> {
  render() {
    PropertyPaneProps.title = this.props.title;
    PropertyPaneProps.children = this.props.children;

    return (
      <div className="property-panel-section">
        <div className="property-panel-header">{this.props.title}</div>
        <div className="property-panel-content">{this.props.children}</div>
      </div>
    );
  }
}
