import React, {Component} from 'react';
import {Text as TextOrigin, Platform, TextStyle} from 'react-native';
import CoreStyle, {isIphoneX} from '../Style/CoreStyle';

// export const FONT_REGULAR = 'Roboto-Regular';
// // export const FONT_REGULAR = "Pacifico-Regular"
// export const FONT_BOLD = 'Roboto-Bold';

interface IText {
  fixTransform: boolean;
  marginLineHeight?: boolean;
  bold?: boolean;
  style?: TextStyle | TextStyle[];
  multiline?: boolean;
  numberOfLines?: number;
}

class UIText extends Component<IText> {
  public static defaultProps = {
    fixTransform: false,
    bold: false,
  };

  render() {
    const {
      children,
      fixTransform,
      bold,
      multiline,
      numberOfLines,
      marginLineHeight,
    } = this.props;
    let {style} = this.props;

    let fontSize = 14;

    if (Array.isArray(style)) {
      let tmpStyle = {};
      style.forEach((iStyle: any) => {
        tmpStyle = {...tmpStyle, ...iStyle};
      });
      style = tmpStyle;
    }

    try {
      if (style) {
        if (Array.isArray(style) && style.length == 2) {
          style.forEach((item: TextStyle) => {
            if (item !== null && !!item.fontSize) {
              fontSize = item.fontSize;
            }
          });
        } else {
          if (style.fontSize) {
            fontSize = style.fontSize;
          }
        }
      }
    } catch (e) {}

    // fontSize = fontSize + (isIphoneX() ? 0 : 0)
    fontSize = fontSize + (Platform.OS === 'ios' ? 2 : 0);

    let customProps = {};

    if (multiline !== undefined) {
      customProps = {...customProps, multiline};
    }

    if (numberOfLines !== undefined) {
      customProps = {...customProps, numberOfLines};
    }

    return (
      <TextOrigin
        {...this.props}
        {...customProps}
        style={[
          {
            color: CoreStyle.textColor,
            fontWeight: bold ? "bold" : "normal",
            fontFamily: "arial",
            transform: [
              {
                translateY: fixTransform && !isIphoneX() ? fontSize * 0.1 : 0,
              },
            ],
            marginBottom: marginLineHeight && isIphoneX() ? fontSize * 0.2 : 0,
          },
          style,
          Platform.OS === 'ios' && {
            fontSize,
          },
        ]}>
        {children}
      </TextOrigin>
    );
  }
}

export default UIText;
