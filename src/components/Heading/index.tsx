import React from 'react';

import styles from './styles.module.scss';

interface HeadingProps {
    children: React.ReactNode;
    fontSize: "xxxs" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"
}

const Heading: React.FC<HeadingProps & React.HTMLProps<HTMLHeadingElement>> = (props) => {
    const { fontSizeXXXS, fontSizeXXS, fontSizeXS, fontSizeSM } = styles;
    const { fontSizeMD, fontSizeLG, fontSizeXL, fontSizeXXL } = styles;

    const fontSize = {
        "xxxs": fontSizeXXXS,
        "xxs": fontSizeXXS,
        "xs": fontSizeXS,
        "sm": fontSizeSM,
        "md": fontSizeMD,
        "lg": fontSizeLG,
        "xl": fontSizeXL,
        "xxl": fontSizeXXL,
    };

    return (
        <h1 className={`${styles.heading} ${props.className} ${fontSize[props.fontSize]}`}>
            {props.children}
        </h1>
    );
}

export default Heading;