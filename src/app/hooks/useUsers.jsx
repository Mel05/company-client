import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth'

const UsersContext = React.createContext()

export const useUsers = () => {
	return useContext(UsersContext)
}

const UsersProvider = ({ children }) => {
	const [users, setUsers] = useState([])
	const { currentUser } = useAuth()
	const [isLoading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		getUsers()
	}, [])

	async function getUsers() {
		try {
			const { content } = await userService.get()
			setUsers(content)
			setLoading(false)
		} catch (error) {
			errorCatcher(error)
		}
	}

	useEffect(() => {
		if (!isLoading) {
			const newUsers = [...users]
			const indexUser = newUsers.findIndex(u => u._id === currentUser._id)
			newUsers[indexUser] = currentUser
			setUsers(newUsers)
		}
	}, [currentUser])

	useEffect(() => {
		if (error !== null) {
			toast(error)
			setError(null)
		}
	}, [error])

	function errorCatcher(error) {
		const { message } = error.response.data
		setError(message)
	}

	function getUserById(userId) {
		return users.find(u => u._id === userId)
	}

	return (
		<UsersContext.Provider value={{ users, getUserById }}>
			{!isLoading ? children : 'Loading ...'}
		</UsersContext.Provider>
	)
}

UsersProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
}

export default UsersProvider
