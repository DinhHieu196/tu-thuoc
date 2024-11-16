import React, {ReactElement, useEffect, useRef, useState} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';

import {Image, TouchableOpacity, ViewStyle} from 'react-native';
import isEqual from 'lodash.isequal';
import Config from '../Config/Config';

const resolveAssetSource = Image.resolveAssetSource;

interface IImageProps extends FastImageProps {
    height?: number;
    width?: number;
    radius?: number;
    onPress?: () => void;
    onSize?: (width: number, height: number) => void;
    children?: ReactElement;
    touchable?: boolean;
    style?: ViewStyle;
}

const UILazyImage = (props: IImageProps) => {
    const BaseFastImage = FastImage as any;
    const [scalableWidth, setScalableWidth] = useState<number | null>(null);
    const [scalableHeight, setScalableHeight] = useState<number | null>(null);
    const [image, setImage] = useState<ReactElement | null>(null);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        onProps(props);
    });

    useEffect(() => {
        setImage(
            <BaseFastImage
                {...props}
                fallback
                style={[
                    props.style,
                    {
                        width: scalableWidth,
                        height: scalableHeight,
                        borderRadius: props.radius ? props.radius : 0,
                    },
                ]}
            />,
        );
    }, [props, scalableHeight, scalableWidth]);

    const onProps = (localProps: any) => {
        const {source} = localProps;
        if (source.uri) {
            const sourceToUse = source.uri ? source.uri : source;

            Image.getSize(
                sourceToUse,
                (width, height) => adjustSize(width, height, props),
                console.error,
            );
        } else {
            const sourceToUse = resolveAssetSource(source);
            adjustSize(sourceToUse.width, sourceToUse.height, props);
        }
    };

    const adjustSize = (
        sourceWidth: number,
        sourceHeight: number,
        localProps: IImageProps,
    ) => {
        const {width, height} = localProps;

        let ratio = 1;

        if (width && height) {
            ratio = Math.min(width / sourceWidth, height / sourceHeight);
        } else if (width) {
            ratio = width / sourceWidth;
        } else if (height) {
            ratio = height / sourceHeight;
        }

        if (mounted.current) {
            const computedWidth = sourceWidth * ratio;
            const computedHeight = sourceHeight * ratio;

            setScalableWidth(computedWidth);
            setScalableHeight(computedHeight);

            !!props.onSize && props.onSize(computedWidth, computedHeight);
        }
    };

    if (!props.onPress) {
        return image;
    } else {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
                {image}
            </TouchableOpacity>
        );
    }
};

export default Config.debug.memo
    ? React.memo<IImageProps>(
          UILazyImage,
          (prevProps, nextProps) => !isEqual(prevProps, nextProps),
      )
    : UILazyImage;
