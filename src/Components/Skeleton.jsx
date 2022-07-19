import React from "react";

function Skeleton({ n = 10 }) {
	return (
		<div className="skeletonC">
			{Array(n)
				.fill()
				.map((_, i) => {
					return (
						<div className="skeleton" key={i}>
							<div className="skeleton__img"></div>
							<div className="skeleton__details">
								<div className="texts">
									<div className="skeleton__text"></div>
									<div className="skeleton__text"></div>
								</div>
								<div className="skeleton__btn"></div>
							</div>
						</div>
					);
				})}
		</div>
	);
}

export default Skeleton;
