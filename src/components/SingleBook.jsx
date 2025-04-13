/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */
import { useGetBookQuery } from "./BookSlice"
import { useParams } from "react-router-dom";
export default function SingleBook(){
    const {id} = useParams();
    const { isLoading, data: book } = useGetBookQuery(id);
    let $details;
    if (!id) {
        $details = <p>Please select a book to see more details.</p>;
    }
    else if (isLoading) {
        $details = <p>Loading book information...</p>;
    }
    else {
        $details = (
          <div className="book">
            <h3>
              Title: "{book.title}"
            </h3>
            <h4>Id: #{book.id}</h4>
            <h5>Author: {book.author}</h5>
            <figure>
              <img src={book.coverimage} alt={book.description} />
            </figure>
            <h5>Description: </h5>
            <h6>{book.description}</h6>
          </div>
        )
    }
    return (
        <aside>
          <h2>Selected Book</h2>
          {$details}
        </aside>
      );
}