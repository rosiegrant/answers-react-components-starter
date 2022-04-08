import { useAnswersActions, useAnswersState } from '@yext/answers-headless-react';
import { SearchBar, VerticalResults, StandardCard, Filters, AppliedFilters } from '@yext/answers-react-components';
import { useEffect } from 'react';
import { ParksCard } from '../cards/ParksCard';

export default function ParksPage() {

    const answersActions = useAnswersActions();
    //set up vertical 
    useEffect(() => {
        //clear any existing filters
        const stateToClear = {
            filters: {},
            universal: {},
            vertical: {}
        }
        answersActions.setState({
            ...answersActions.state,
            ...stateToClear
        });
        //update the vertical
        answersActions.setVertical('locations');
        //determine number per page
        answersActions.setVerticalLimit(8);
        //fire an empty query on page load
        const executeQuery = async () => {
            answersActions.executeVerticalQuery();
        };
        executeQuery();
    }, []);

    //keep track of vertical results for no results
    const verticalResults = useAnswersState(state => state.vertical.results) || [""];

    return (
        <div>
            <SearchBar />
            <div className="flex m-6">
                <Filters.Facets searchOnChange={true} className='mr-8 text-left min-w-[12rem]'>
                    {facets => facets.map((f, i) => {
                        if (f.options.length === 0) {
                            return null;
                        }
                        return (
                            <div key={f.fieldId} className='md:w-40 mr-10'>
                                <Filters.FilterGroup fieldId={f.fieldId}>
                                    <Filters.CollapsibleLabel label={f.displayName} />
                                    <Filters.CollapsibleSection>
                                        <Filters.SearchInput />
                                        {f.options.map(o =>
                                            <Filters.CheckboxOption
                                                key={o.displayName}
                                                value={o.value}
                                            />
                                        )}
                                    </Filters.CollapsibleSection>
                                </Filters.FilterGroup>
                            </div>
                        );
                    })}
                </Filters.Facets>
                <div>
                    <AppliedFilters />
                    {verticalResults.length === 0 &&
                        <div>no results darn </div>
                    }
                    <VerticalResults
                        customCssClasses={{ results: "text-left grid grid-cols-4 gap-6 " }}
                        CardComponent={
                            ({ result }) => <ParksCard
                                result={result}
                                showFeedbackButtons={true}
                            />
                        }
                        displayAllOnNoResults={false}
                    />
                </div>
            </div>
        </div>
    )
}