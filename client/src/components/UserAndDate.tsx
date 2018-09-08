import React from 'react'
import { User } from '../dtos/user.dto';
import { Link } from "react-router-dom"

interface P {
  user: User
  date: Date
  className?: string
}

export default ({ user, date, className }: P) => (
	<header className={`und ${className || ""}`}>
		<img
			src={user.ProfileImageURL}
			alt=""
			className="und__img"
		/>
		<Link to={`/user/${user.Username}`} className="und__user">{user.Name}</Link>
		<p className="und__date">
			{`${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.${
				date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()
			}.${date.getFullYear()}`}
		</p>
	</header>
)
