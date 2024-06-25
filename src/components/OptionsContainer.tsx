import { useCallback, useState } from "react";

export const OptionsContainer = () => {
    const [options, setOptions] = useState<{
        [id: string]: string;
    }>({
        "1": "Yes",
        "2": "No",
    });

    const genId = useCallback(() => {
        if (crypto) return crypto.randomUUID();

        return Math.random().toString(36).substring(2);
    }, []);

    const createOption = () => {
        setOptions({
            ...options,
            [genId()]: "",
        });
    };

    const updateOption = (id: string, value: string) => {
        setOptions({
            ...options,
            [id]: value,
        });
    };

    const deleteOption = (id: string) => {
        const { [id]: _, ...newOptions } = options;
        setOptions(newOptions);
    };

    return (
        <div>
            <div className="flex gap-2">
                <label>Options</label>
                <button onClick={createOption} type="button">
                    <span className="material-icons">add</span>
                </button>
                <button
                    onClick={() =>
                        setOptions({
                            "1": "",
                            "2": "",
                        })
                    }
                    type="button"
                >
                    <span className="material-icons">clear</span>
                </button>
            </div>
            {Object.entries(options).map(([id, value]) => (
                <div key={id} className="flex flex-row py-1 gap-2">
                    <input
                        value={value}
                        onChange={(e) => updateOption(id, e.target.value)}
                        name="options"
                    />
                    {Object.keys(options).length > 2 && (
                        <button onClick={() => deleteOption(id)} type="button">
                            <span className="material-icons">delete</span>
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};
