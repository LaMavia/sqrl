import React from "react"
interface Props {
	label: string
	type: string
	name: string
	id: string
	className?: string
}
export const FormPart = ({ label, type, name, name: id, className }: Props) => (
	<div className="sign__form__part">
		<label htmlFor="login" className="sign__form__part__label">
			{label}
		</label>
		<input
			type={type}
			name={name}
			id={id}
			className={`sign__form__part__input ${className || ""}`}
		/>
	</div>
)
