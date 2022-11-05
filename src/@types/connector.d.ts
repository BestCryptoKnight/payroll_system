declare type ConnectResult = {
    connected: boolean;
    address: string;
    chainid: number;
    errmsg: string;
}
declare type SendTxResult = {
    success:boolean;
    txid?: string;
    errmsg?: string;
}
declare type CallbackAccountsChanged = (address:string)=>void
declare type CallbackChainChanged = (chainid:number)=>void

declare interface IWallet {
    get isConnected():boolean;

    connect():Promise<ConnectResult>;
    disconnect():void;

    setCallback(cbAccountsChanged:CallbackAccountsChanged, cbChainChanged:CallbackChainChanged):void;
    sendTx(from:string, to:string, abi:any,method: string, args:Array<string>): Promise<SendTxResult>;
}

declare interface IConnector {
    instance?:IWallet;
    currentAddress?:string;
    currentChainId?:number;

    get connected():boolean;
    get address():string|undefined;
    get chainId():number|undefined;
    get chainName():string|undefined;
    get explorer():string;

    connect(walletname:string):Promise<ConnectResult>;
    disconnect():void;

    setCallback(cbAccountsChanged:CallbackAccountsChanged, cbChainChanged:CallbackChainChanged):void;
    
    url(type:'address'|'tx', arg: string):string;
    validAddress(address: string):boolean;
    call(to: string, abi: string, method: string, args: Array<string>):Promise<any>;
    sendTx(from:string, to:string, abi:any,method: string, args:Array<string>): Promise<SendTxResult>;
    waitTransaction(txnHash: string, blocksToWait: number):Promise<any>;
}