import { useRef, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi'
import { FaTimes, FaSearch } from 'react-icons/fa'
import data from '../data'

export const BodyPart = () => {
	const { body, bodyPart } = useParams()
	const bodyData = data[body].parts[bodyPart]

	const searchRef = useRef()
	const [products, setProducts] = useState(bodyData.products)
	const [searchText, setSearchText] = useState('')
	const [isOpen, setIsOpen] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		if (isOpen) {
			searchRef.current.focus()
		}
	}, [isOpen])

	useEffect(() => {
		if (!searchText) {
			setProducts(bodyData.products)
		} else {
			setProducts(
				bodyData.products.filter(product => {
					return product.name.toLowerCase().includes(searchText.toLowerCase())
				})
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText])

	return (
		<main className='body__part container'>
			<div className='products__container'>
				<div className='product__headline'>
					<h2>{bodyData.name}</h2>
					<p>{bodyData.desc}</p>
				</div>

				<div className='img__container'>
					<img src={`/img/${body}/${bodyData.image}`} alt={bodyPart} />
				</div>

				<div className='links__controls row'>
					<div className='return flex-center'>
						<HiOutlineArrowNarrowLeft onClick={() => navigate(-1)} />
					</div>
					<h2>{data[body].name}</h2>
					<button
						onClick={() => setIsOpen(prev => !prev)}
						className='search__btn flex-center'
					>
						{isOpen ? (
							<FaTimes className='search-icon' />
						) : (
							<FaSearch className='search-icon' />
						)}
					</button>
				</div>
				<div className='flex-center search-container'>
					<div className={isOpen ? 'show' : ''}>
						<label className='offscreen' htmlFor='search'>
							Pretražite preparate po nazivu
						</label>
						<input
							ref={searchRef}
							type='search'
							name='search'
							id='search'
							placeholder='Pretražite delove tela'
							autoComplete='off'
							value={searchText}
							onChange={e => setSearchText(e.target.value)}
						/>
						<FaSearch className='icon' />
					</div>
				</div>
				<div className='product__cards__container'>
					{products.map((product, index) => (
						<ProductCard
							key={index}
							{...product}
							link={`/${body}/${bodyPart}/${index}`}
							path={`/img/${body}/`}
						/>
					))}
				</div>
			</div>
		</main>
	)
}
