import { useState } from "react";

import { Box } from "@mui/material";

import Form from "./components/Form";
import Item from "./components/Item";

// import { useApp } from "./ThemedApp";

export default function App() {
    // const { showForm, setShowForm } = useApp();

	const [data, setData] = useState([
		{ id: 3, content: "Yay, interesting.", name: "Chris" },
		{ id: 2, content: "React is fun.", name: "Bob" },
		{ id: 1, content: "Hello, World!", name: "Alice" },
	]);

	const remove = id => {
		setData(data.filter(item => item.id !== id));
	};

	const add = (content, name) => {
		const id = data[0].id + 1;
		setData([{ id, content, name }, ...data]);
	};

	return (
		<Box>
			{<Form add={add} />}
			{data.map(item => {
				return (
					<Item
						key={item.id}
						item={item}
						remove={remove}
					/>
				);
			})}
		</Box>
	);
}
