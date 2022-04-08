import { CompositionMethod, useComposedCssClasses } from '@yext/answers-react-components';
import { useCardAnalyticsCallback } from '@yext/answers-react-components';
import { CardProps } from '@yext/answers-react-components';
import {
    ThumbsFeedback,
    ThumbsFeedbackCssClasses
} from '@yext/answers-react-components';
import { useCardFeedbackCallback } from '@yext/answers-react-components';
import { renderHighlightedValue } from '@yext/answers-react-components';
import { CtaData, isCtaData } from '@yext/answers-react-components';
import { isStringOrHighlightedValue, validateData } from '@yext/answers-react-components';

import { HighlightedValue, Result } from '@yext/answers-headless-react';

/**
 * Props for a ParksCard.
 *
 * @public
 */
export interface ParksCardProps extends CardProps {
    /** Whether or not to show an ordinal for numbering the card. */
    showOrdinal?: boolean,
    /** Whether or not to show thumbs up/down buttons to provide feedback on the result card */
    showFeedbackButtons?: boolean,
    /** CSS classes for customizing the component styling. */
    customCssClasses?: StandardCardCssClasses,
    /** {@inheritDoc CompositionMethod} */
    cssCompositionMethod?: CompositionMethod
}

/**
 * The CSS class interface used for {@link StandardCard}.
 *
 * @public
 */
export interface StandardCardCssClasses extends ThumbsFeedbackCssClasses {
    container?: string,
    header?: string,
    body?: string,
    descriptionContainer?: string,
    ctaContainer?: string,
    cta1?: string,
    cta2?: string,
    ordinal?: string,
    title?: string,
    titleLink?: string,
    titleHighlighted?: string,
    titleNonHighlighted?: string,
    descriptionHighlighted?: string,
    descriptionNonHighlighted?: string
}

const builtInCssClasses: StandardCardCssClasses = {
    container: 'flex flex-col justify-between border rounded-lg mb-4 p-4 shadow-sm',
    header: 'flex text-neutral-dark p-4',
    body: 'flex justify-end pl-4 pr-4 text-base',
    descriptionContainer: 'w-full',
    ctaContainer: 'flex flex-col justify-end ml-4',
    cta1: 'whitespace-nowrap bg-primary text-white font-medium rounded-lg py-2 px-5 shadow',
    cta2: 'whitespace-nowrap bg-white text-primary font-medium rounded-lg py-2 px-5 mt-2 shadow',
    ordinal: 'mr-1.5 text-lg font-medium',
    title: 'text-lg font-medium',
    titleLink: 'text-lg font-medium text-primary hover:underline focus:underline',
    feedbackButtonsContainer: 'flex justify-end p-4 text-sm text-gray-400 font-medium',
    titleHighlighted: 'font-bold',
    titleNonHighlighted: 'font-medium',
    descriptionHighlighted: 'font-semibold',
    descriptionNonHighlighted: 'font-normal'
};

interface ParksCardData {
    /** The text to display in the card's header. */
    title: HighlightedValue | string,
    /** The content to display in the card's body. */
    description: HighlightedValue | string,
    /** CTA data to render. */
    cta1: CtaData,
    /** CTA data to render. */
    cta2: CtaData,
    photoGallery?: {
        image: {
            url: string,
            width: string,
            height: string,
            sourceUrl: string,
            thumbnails: {
                url: string,
                width: string,
                height: string
            }[]
        }
    }[]
}

/**
 * This Component renders the base result card.
 *
 * @public
 *
 * @param props - An object containing the result itself and any additional information needed
 *                to render the card
 * @returns A React element for the result card
 */
export function ParksCard(props: ParksCardProps): JSX.Element {
    const {
        showOrdinal,
        result,
        customCssClasses,
        cssCompositionMethod,
        showFeedbackButtons
    } = props;
    const cssClasses = useComposedCssClasses(builtInCssClasses, customCssClasses, cssCompositionMethod);
    const data = dataForRender(result);

    const handleCtaClick = useCardAnalyticsCallback(result, 'CTA_CLICK');
    const handleTitleClick = useCardAnalyticsCallback(result, 'TITLE_CLICK');
    const handleFeedbackButtonClick = useCardFeedbackCallback(result);

    // TODO (cea2aj) We need to handle the various linkType so these CTAs are clickable
    function renderCTAs(cta1?: CtaData, cta2?: CtaData) {
        return (<>
            {(cta1 ?? cta2) &&
                <div className={cssClasses.ctaContainer}>
                    {cta1 && <button className={cssClasses.cta1} onClick={handleCtaClick}>{cta1.label}</button>}
                    {cta2 && <button className={cssClasses.cta2} onClick={handleCtaClick}>{cta2.label}</button>}
                </div>
            }
        </>);
    }

    // TODO (cea2aj) Update this to render the ordinal once we get mocks from UX
    function renderOrdinal(_index: number) {
        // return (
        //   <div className={cssClasses.ordinal}>{_index}</div>
        // );
        return null;
    }

    function renderTitle(title: HighlightedValue | string) {
        const titleJsx = renderHighlightedValue(title, {
            highlighted: cssClasses.titleHighlighted,
            nonHighlighted: cssClasses.titleNonHighlighted
        });

        return (
            result.link
                ? <a href={result.link} className={cssClasses.titleLink} onClick={handleTitleClick}>
                    {titleJsx}
                </a>
                : <div className={cssClasses.title}>{titleJsx}</div>
        );
    }

    return (
        <div className="flex flex-col justify-start rounded-lg mb-4 shadow-lg bg-white hover:shadow-xl hover:cursor-pointer">
            {(data.photoGallery && data.photoGallery[0] && data.photoGallery[0].image.url) &&
                <div>
                    <img className="rounded-t-lg" style={{ width: "-webkit-fill-available" }} src={data.photoGallery[0].image.url}></img>
                </div>
            }
            <div className={cssClasses.header}>
                {showOrdinal && result.index && renderOrdinal(result.index)}
                {data.title && renderTitle(data.title)}
            </div>
            {(data.description ?? data.cta1 ?? data.cta2) &&
                <div className={cssClasses.body}>
                    {data.description &&
                        <div className={cssClasses.descriptionContainer}>
                            {renderHighlightedValue(data.description, {
                                highlighted: cssClasses.descriptionHighlighted,
                                nonHighlighted: cssClasses.descriptionNonHighlighted
                            })}
                        </div>}
                    {renderCTAs(data.cta1, data.cta2)}
                </div>
            }
            {showFeedbackButtons && <ThumbsFeedback
                feedbackText=''
                onClick={handleFeedbackButtonClick}
                customCssClasses={cssClasses}
                cssCompositionMethod={cssCompositionMethod}
            />}
        </div>
    );
}

function isPhotoGallery(data: any) {
    return true;

}
function dataForRender(result: Result): Partial<ParksCardData> {
    const data = {
        title: result.highlightedFields?.name ?? result.rawData.name,
        description: result.highlightedFields?.description ?? result.rawData.description,
        cta1: result.rawData.c_primaryCTA,
        cta2: result.rawData.c_secondaryCTA,
        photoGallery: result.rawData.photoGallery
    };

    return validateData(data, {
        title: isStringOrHighlightedValue,
        description: isStringOrHighlightedValue,
        cta1: isCtaData,
        cta2: isCtaData,
        photoGallery: isPhotoGallery
    });
}
