import { actions } from "astro:actions";
import { useActionState } from "react";

export const VoteForm: React.FC<{
    user: string;
    votingId: string;
    options: {
        id: string;
        option: string;
    }[];
}> = ({ user, votingId, options }) => {
    return (
        <form method="POST">
            <select name="option" className="mb-1">
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.option}
                    </option>
                ))}
            </select>
            <div>
                <button className="btn" type="submit">
                    Vote
                </button>
            </div>
        </form>
    );
};
