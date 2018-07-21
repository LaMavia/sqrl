const isTeen = (num: number): boolean => 
	num - 10 < 10 && num - 10 > 0
	

	// "postinstall": "tsc ./app -t ES2015 -m commonjs"

interface Post {
	Title: string
  Tags: string | string[]
  Date: string
  _doc: Post
}
export default (post: Post) => {
	let daySuffix
	const Date = (post.Date.split(",").length <= 1
		? post.Date.split(" ").slice()
		: post.Date.split(",").slice()
  )
  .map(Number)
  .filter(Boolean)
  const day = Date[2]
  // @ts-ignore
	const formattedPost: Post = {
		...post._doc 
	}
	if(isTeen(day)) daySuffix = "th"
	else if (day - Math.floor(day / 10) * 10 === 1) daySuffix = "st"
	else if (day - Math.floor(day / 10) * 10 === 2) daySuffix = "nd"
	else if (day - Math.floor(day / 10) * 10 === 3) daySuffix = "rd"
	else daySuffix = "th"
	formattedPost.Date = `${Date[1]} ${Date[2] + daySuffix} ${Date[0]}`
	return formattedPost
}
