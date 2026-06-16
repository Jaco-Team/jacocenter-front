import { TextTag, TitleTag, TypographyProps } from './Typography.types';
import './Typography.style.css';

const withTypography = (defaults: TypographyProps) => {
    return function Typography(props: TypographyProps) {
        const {
            Tag = 'span',
            variant = 'body-m-regular-16',
            className = '',
            children,
            ...rest
        } = { ...defaults, ...props};

        return (
            <Tag className={`${variant} ${className}`} {...rest}>
                {children}
            </Tag>
        );
    };
};

export const Typography: React.FC<TypographyProps> = withTypography({});

export const Text: React.FC<TypographyProps<TextTag>> = withTypography({
  Tag: 'span',
  variant: 'body-m-regular-16',
});

export const Title: React.FC<TypographyProps<TitleTag>> = withTypography({
  Tag: 'h3',
  variant: 'heading-l-regular-20',
});
