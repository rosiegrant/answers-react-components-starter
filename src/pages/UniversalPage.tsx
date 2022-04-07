
import { SearchBar, UniversalResults } from '@yext/answers-react-components';

export default function UniversalPage() {
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