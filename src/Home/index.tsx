import "./index.scss";

const Home = () => {
	return (
		<section className="py-7 py-md-0 bg-hero" id="home">
			<div className="container">
				<div className="row vh-md-100">
					<div className="col-md-8 col-sm-10 col-12 mx-auto my-auto text-center">
						<h2 className="heading-black text-capitalize" style={{ color: "#1de9b6" }}>THC_NAZA NFT <br /> COLLECTION</h2>
						<p className="lead py-3">Introducing the Transhuman Coin "Neural Astronomy Zone Ancillary" NFTs.<br /><br />Embark on a journey into a metaverse of Transhumanism and tokenomics.</p>
						<br />
						<a href="https://bscscan.com/address/0xc14f351c2b83d9e1d63b3710e04bbd6b132ef5d9">View official THC NAZA Contract</a>
						<br />
						<br />
						<button className="btn btn-primary d-inline-flex flex-row align-items-center" id="loginButton">
							Connect Metamask Wallet
						</button>
						<p id="userWallet" className="text-lg text-gray-600 my-2"></p>
						<p id="userNetwork" className="text-lg text-gray-600 my-2"></p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Home;
