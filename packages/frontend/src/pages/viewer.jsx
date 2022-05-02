import { useEffect, useState } from 'react';
import NftCard from '../components/nftcard';
import Wallet from '../components/wallet';
import { fetchNFTs } from '../utils/fetchNFTs';


const Viewer = () => {

    const [walletAddress, setOwner] = useState("")
    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
    const sampleWallet = process.env.REACT_APP_SAMPLE_WALLET;
    const [NFTs, setNFTs] = useState("")

    useEffect(() => {
        setNFTs("")
        if (walletAddress) fetchNFTs(walletAddress, contractAddress, setNFTs)
    }, [walletAddress])

    return (
        <div>
            <header className=' py-24  mb-12 w-full   toasts'>
                <div className='flex-grow flex justify-end mr-12 mb-12'>
                </div>
                <div className='flex flex-col items-center mb-12'>
                    <div className='mb-16 text-white text-center'>
                        <h1 className='text-5xl  font-bold font-body mb-2'>
                            Toast Viewer
                        </h1>
                        <p>Display your Toasts by connecting your wallet </p>
                    </div>

                    <div className='flex flex-col text-slate-200 font-bold items-center justify-center mb-4 w-2/6 gap-y-2' >
                        {
                            <Wallet walletAddress={walletAddress} setOwner={setOwner}></Wallet>
                        }
                    </div>
                    {walletAddress && <div className='w-2/6 flex justify-center'>
                        <button className='py-3 bg-white rounded-sm w-full hover:bg-slate-100' onClick={() => { fetchNFTs(walletAddress, contractAddress, setNFTs) }}>Display My Toasts</button>
                    </div>}
                    <br />

                </div>
            </header>

            <section className='flex flex-wrap justify-center'>
                {
                    NFTs ? NFTs.map(NFT => {

                        return (
                            <NftCard key={NFT.value.id + NFT.value.contractAddress} image={NFT.value.image} id={NFT.value.id} title={NFT.value.title} description={NFT.value.description} address={NFT.value.contractAddress} attributes={NFT.value.attributes}></NftCard>
                        )
                    }) : <div>No NFTs found</div>
                }
            </section>
        </div>
    )
}


export default Viewer