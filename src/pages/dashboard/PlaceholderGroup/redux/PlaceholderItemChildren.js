import React from 'react'
import { useSelector } from 'react-redux';

function PlaceholderItemChildren({ items }) {

    // place holder item children
    const placeholderItemChildren = useSelector((state) => state.PlaceholderItem.placeholderData);

    const uniquePlaceholderItems = [...new Set(placeholderItemChildren.children)];

    const result = uniquePlaceholderItems.filter((item) => item.id === Number(items.modelId));


    return (
        <p>
            {
                result.length ?
                    result[0].name
                    : `no items available here !!!`
            }

        </p>
    )
}

export default PlaceholderItemChildren
