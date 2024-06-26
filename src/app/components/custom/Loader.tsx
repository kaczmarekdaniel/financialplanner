import React from "react";



const Loader= () => {
		return (
			<div className="flex w-auto h-4 gap-2">
				<div
					aria-hidden="true"
					className="w-3 h-3 bg-slate-600 animate-pulse duration-1000 rounded-full"
				>
					{" "}
				</div>
				<div
					aria-hidden="true"
					className="w-3 h-3 bg-slate-600 animate-pulse duration-1000 delay-100 rounded-full"
				>
					{" "}
				</div>
				<div
					aria-hidden="true"
					className="w-3 h-3 bg-slate-600 animate-pulse duration-1000 delay-200 rounded-full"
				>
					{" "}
				</div>
			</div>
		);
};

export default Loader;
