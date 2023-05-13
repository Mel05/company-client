import React from 'react'
import PropTypes from 'prop-types'

import styles from './groupList.module.css'

const GroupList = ({
	professions,
	selectedProf,
	valueProperty,
	contentProperty,
	handleProfessionsSelect,
}) => {
	if (!Array.isArray(professions)) {
		return (
			<ul className={styles.list}>
				{Object.keys(professions).map(prof => (
					<li
						key={professions[prof][valueProperty]}
						className={
							'list-group-item' +
							(professions[prof] === selectedProf ? ' active' : '')
						}
						onClick={() => handleProfessionsSelect(professions[prof])}
						role={'button'}
					>
						{professions[prof][contentProperty]}
					</li>
				))}
			</ul>
		)
	}
	return (
		<ul className={styles.list}>
			{professions.map(prof => (
				<li
					key={prof[valueProperty]}
					className={
						'list-group-item' +
						(prof[valueProperty] === selectedProf ? ' active' : '')
					}
					role='button'
					onClick={() => handleProfessionsSelect(prof[valueProperty])}
				>
					{prof[contentProperty]}
				</li>
			))}
		</ul>
	)
}

GroupList.defaultProps = {
	valueProperty: '_id',
	contentProperty: 'name',
}

GroupList.propTypes = {
	professions: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
		.isRequired,
	selectedProf: PropTypes.string,
	valueProperty: PropTypes.string.isRequired,
	contentProperty: PropTypes.string.isRequired,
	handleProfessionsSelect: PropTypes.func.isRequired,
}

export default GroupList
