import styles from './Home.module.css'
import React from 'react'
import TransactionForm from './TransactionForm'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import TransactionList from './TransactionList'

export default function Home() {

  const { user } = useAuthContext()

  const { documents, error } = useCollection(
    'transactions',
    user ? ['uid', '==', user.uid] : null,
    ['createdAt', 'desc']
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
          {error && <p>{error}</p>}
          {documents && <TransactionList transactions={documents}/>}
      </div>
      <div className={styles.sidebar}>
          {user && <TransactionForm uid={user.uid}/>}
      </div>
    </div>
  )
}

