
import { useAnswersActions } from '@yext/answers-headless-react';
import { SearchBar, UniversalResults } from '@yext/answers-react-components';
import { useLayoutEffect } from 'react';

export default function UniversalPage() {
    const answersActions = useAnswersActions();

    //set up universal 
    useLayoutEffect(() => {
        const stateToClear = {
            filters: {},
            universal: {},
            vertical: {}
        }
        answersActions.setState({
            ...answersActions.state,
            ...stateToClear
        });
        answersActions.setUniversal();
        const executeQuery = async () => {
            answersActions.executeUniversalQuery();
        };
        executeQuery();
    }, []);

    return (
        <div>
            <SearchBar />
            <UniversalResults
                verticalConfigMap={{
                    locations: {
                        label: "Parks"
                    }
                }}
            />
        </div>
    )
}