import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function wipe() {
  console.log('Starting Sanity Wipe...')
  try {
    const query = '*[_type in ["project", "post"]]'
    const docs = await client.fetch(query)
    
    if (docs.length === 0) {
      console.log('No documents found to delete.')
      return
    }

    console.log(`Found ${docs.length} documents. Deleting...`)
    
    const transaction = client.transaction()
    docs.forEach((doc: any) => {
      transaction.delete(doc._id)
    })
    
    await transaction.commit()
    console.log('Successfully wiped Database.')
  } catch (err) {
    console.error('Failed to wipe:', err)
  }
}

wipe()
