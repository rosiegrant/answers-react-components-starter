import { useAnswersActions, useAnswersState } from '@yext/answers-headless-react';
import { SearchBar, VerticalResults, StandardCard, Filters, AppliedFilters } from '@yext/answers-react-components';
import { useEffect } from 'react';

export default function ParksPage() {

    const answersActions = useAnswersActions();
    //set up vertical 
    useEffect(() => {
        const stateToClear = {
            filters: {},
            universal: {},
            vertical: {}
        }
        answersActions.setState({
            ...answersActions.state,
            ...stateToClear
        });
        answersActions.setVertical('locations');
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
                                <Filters.FilterGroup>
                                    <Filters.CollapsibleLabel label={f.displayName} />
                                    <Filters.CollapsibleSection>
                                        <Filters.SearchInput />
                                        {f.options.map(o =>
                                            <Filters.CheckboxOption
                                                key={o.displayName}
                                                value={o.value}
                                                fieldId={f.fieldId}
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
                        CardComponent={StandardCard}
                        displayAllOnNoResults={false}
                    />
                </div>
            </div>
        </div>
    )
}