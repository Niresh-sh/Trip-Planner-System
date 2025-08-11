import { useState, useEffect } from 'react';
import fetchData from '../Services/FetchService';
import { Link } from 'react-router-dom';

function AllCity() {
	const [Cities, setCities] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchCities = async () => {
			try {
				let response = await fetchData(
					'https://api-city-tau.vercel.app/api/city'
				);
				setCities(response.data);
			} catch (err) {
				setError('Failed to load Cities. Please try again later.');
				console.log(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchCities();
	}, []);

	return (
		<div className="w-[85vw] mx-auto mt-6">
			<h1 className="text-3xl font-extrabold text-center text-gray-800">
				All Cities
			</h1>

			{/* Loading State */}
			{loading && (
				<p className="text-center text-lg font-semibold mt-4">
					Loading Cities...
				</p>
			)}

			{/* Error State */}
			{error && <p className="text-center text-red-500 mt-4">{error}</p>}

			{/* Category Grid */}
			{!loading && !error && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
					{Cities.map((item, index) => (
						<Link
							to={`/singledestination/${item.id}`}
							className="group relative block overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
							key={index}>
							<div className="relative h-40 flex items-center justify-center bg-gray-100">
								<img
									src={item.image}
									alt={item.title}
									className="object-cover h-full w-full rounded-t-lg transition-transform group-hover:scale-110 duration-300"
								/>
							</div>
							<div className="p-4 text-center">
								<h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
									{item.title}
								</h2>
							</div>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}



export default AllCity
