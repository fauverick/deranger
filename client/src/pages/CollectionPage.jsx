import Collection from "./Collection";
import { ContextConsumer } from "../context/Context";

export default function CollectionPage(){
    return (
        <ContextConsumer>
        {
            (context) => {
                
                const search = context.search;
                const updateSearch = context.updateSearch;
                // updateSearch(null)
                return (
                    <Collection
                        search = {search}
                    />
                )
            }
        }
        </ContextConsumer>
    )
}