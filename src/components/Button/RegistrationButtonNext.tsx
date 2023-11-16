import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
const Button = styled.button`
	text-decoration: none;
	padding: 10px 20px;
	background: #3bb3bd;
	font-family: Inter;
	font-weight: bold;
	border-radius: 3px;
	color: white;
	border: none;
	margin-top: 30px;
	&:hover {
		cursor: pointer;
		background: #33aab4;
	}
`;
//fix-type
type Props = {
disabled?:boolean;
setStep:Dispatch<SetStateAction<number>>;
trigger?:any
}
export const RegistrationButtonNext = ({
	disabled,
	setStep,
	trigger,
}:Props) => {

	async function TriggerValidation() {
		const output = await trigger();

		if (output) {
			setStep((prevState: number) => prevState + 1);
		}
	}
	return (
		<Button onClick={() => TriggerValidation()} disabled={disabled}>
			Next
		</Button>
	);
};
