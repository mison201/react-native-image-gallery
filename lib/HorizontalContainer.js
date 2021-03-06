import * as PropTypes from 'prop-types';
import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { OpenedImageView } from './OpenedImageView';
export class HorizontalContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.getItemLayout = this.getItemLayout.bind(this);
        this.onPressImage = this.onPressImage.bind(this);
        this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
        this.renderItem = this.renderItem.bind(this);
        const { imageHeight, imageWidth } = props;
        this.state = { imageHeight, imageWidth };
    }
    componentWillReceiveProps(nextProps) {
        const { imageHeight, imageWidth } = nextProps;
        if (imageWidth > 0 && imageHeight > 0) {
            this.setState({ imageWidth, imageHeight });
        }
    }
    onPressImage() {
        const { imageId, onPressImage } = this.props;
        if (onPressImage) {
            onPressImage(imageId);
        }
    }
    onViewableItemsChanged(params) {
        const { item: { id = null } = {} } = params.viewableItems[0];
        const { dismissProgress, imageId, onChange, openProgress } = this.props;
        if (!openProgress && !dismissProgress && id !== imageId && onChange) {
            onChange(id);
        }
    }
    getItemLayout(items, index) {
        const { width } = this.props;
        return { length: width, index, offset: index * width };
    }
    renderItem(listItem) {
        const { height, realImageHeight, realImageWidth, transitionProgress, width } = this.props;
        const { imageHeight, imageWidth } = this.state;
        return (React.createElement(OpenedImageView, { height: height, imageHeight: imageHeight, imageWidth: imageWidth, onPress: this.onPressImage, realImageWidth: realImageWidth, realImageHeight: realImageHeight, transitionProgress: transitionProgress, url: listItem.item.url, width: width }));
    }
    render() {
        const { imageId, images, transitionProgress } = this.props;
        const { imageHeight, imageWidth } = this.state;
        const initialScrollIndex = images.findIndex((img) => img.id === imageId);
        return (React.createElement(FlatList, { initialNumToRender: images.length, style: viewStyles.container, data: images, extraData: `w${imageWidth}-h${imageHeight}-t${transitionProgress._value}`, renderItem: this.renderItem, getItemLayout: this.getItemLayout, horizontal: true, pagingEnabled: true, keyExtractor: (item) => `OpenedImageView-${item.id}`, initialScrollIndex: initialScrollIndex, onViewableItemsChanged: this.onViewableItemsChanged }));
    }
}
HorizontalContainer.propTypes = {
    dismissProgress: PropTypes.object,
    height: PropTypes.number.isRequired,
    imageHeight: PropTypes.number.isRequired,
    imageId: PropTypes.string.isRequired,
    imageWidth: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    })).isRequired,
    onChange: PropTypes.func,
    onPressImage: PropTypes.func.isRequired,
    openProgress: PropTypes.object,
    realImageHeight: PropTypes.number.isRequired,
    realImageWidth: PropTypes.number.isRequired,
    transitionProgress: PropTypes.object.isRequired,
    width: PropTypes.number.isRequired
};
const viewStyles = StyleSheet.create({
    container: {
        flex: 1
    }
});
//# sourceMappingURL=HorizontalContainer.js.map