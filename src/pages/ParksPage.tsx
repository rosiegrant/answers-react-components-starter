import { useAnswersActions } from '@yext/answers-headless-react';
import { SearchBar, VerticalResults, StandardCard } from '@yext/answers-react-components';
import { useEffect } from 'react';

export default function ParksPage() {

    const answersActions = useAnswersActions();
    useEffect(() => {
        answersActions.setVertical('locations');
    });

    return (
        <div>
            <SearchBar />
            <VerticalResults
                CardComponent={StandardCard}
            />
        </div>
    )
}