// SPDX-License-Identifier: MIT

//**************************************************************
// MintED Tokens of Appreciation (TOASTs) ERC1155 Contract
//**************************************************************

pragma solidity ^0.8.0;

//OPENZEPPELIN IMPORTS
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract TOASTS is ERC1155, ERC1155Supply, AccessControl {
    //define roles
    bytes32 public constant ADMIN_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC1155("") {
        _setRoleAdmin(ADMIN_ROLE, ADMIN_ROLE);
        _setRoleAdmin(MINTER_ROLE, ADMIN_ROLE);

        _setupRole(ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    //Manage Pausing
    bool public paused = false;

    function togglePause() external onlyRole(ADMIN_ROLE) {
        paused = !paused;
    }

    //-------------------------------------------------------

    //Manage Cost (potential future use.  Won't be used for primary sales)
    mapping(uint256 => uint256) private tokenIdtoCost;

    function setTokenCost(uint256 tokenId_, uint256 cost_)
        external
        onlyRole(ADMIN_ROLE)
    {
        tokenIdtoCost[tokenId_] = cost_;
    }

    function getTokenCost(uint256 tokenId_) external view returns (uint256) {
        return tokenIdtoCost[tokenId_];
    }

    //-------------------------------------------------------

    //Manage Admins (think: whitelist/allowlist functionality, but for administrators)

    bool public onlyAdmins = true;
    address payable[] public adminAddresses;

    function toggleOnlyAdmins() external onlyRole(ADMIN_ROLE) {
        onlyAdmins = !onlyAdmins;
    }

    function createAdminList(address payable[] calldata _users)
        external
        onlyRole(ADMIN_ROLE)
    {
        delete adminAddresses;
        adminAddresses = _users;
    }

    function isAdmin(address _user) public view returns (bool) {
        for (uint256 i = 0; i < adminAddresses.length; i++) {
            if (adminAddresses[i] == _user) {
                return true;
            }
        }
        return false;
    }

    //access based on openzeppelin AccessControl.sol
    function assignRole(bytes32 role, address account) public {
        grantRole(role, account);
    }

    //-------------------------------------------------------

    //Manage Max Supply of each Token (set to 1 for unique NFT, > 1 for unset for semi-fungible)
    mapping(uint256 => uint256) private tokenIdtoTokenMaxSupply;

    function setTokenMaxSupply(uint256 tokenId_, uint256 maxSupply_)
        external
        onlyRole(ADMIN_ROLE)
    {
        require(
            maxSupply_ >= totalSupply(tokenId_),
            "max supply must be greater than current supply"
        );

        tokenIdtoTokenMaxSupply[tokenId_] = maxSupply_;
    }

    function getTokenMaxSupply(uint256 tokenId_)
        external
        view
        returns (uint256)
    {
        return tokenIdtoTokenMaxSupply[tokenId_];
    }

    function getTokenCurrentSupply(uint256 tokenId_)
        external
        view
        returns (uint256)
    {
        return totalSupply(tokenId_);
    }

    //-------------------------------------------------------

    // Internal Functions
    function _toString(uint256 value_) internal pure returns (string memory) {
        if (value_ == 0) {
            return "0";
        }
        uint256 _iterate = value_;
        uint256 _digits;
        while (_iterate != 0) {
            _digits++;
            _iterate /= 10;
        } // get digits in value_
        bytes memory _buffer = new bytes(_digits);
        while (value_ != 0) {
            _digits--;
            _buffer[_digits] = bytes1(uint8(48 + uint256(value_ % 10)));
            value_ /= 10;
        } // create bytes of value_
        return string(_buffer); // return string converted bytes of value_
    }

    //-------------------------------------------------------

    // Manage Name & Symbol
    string public name = "mintED Toasts";
    string public symbol = "TOASTS";

    function setNameAndSymbol(string memory name_, string memory symbol_)
        external
        onlyRole(ADMIN_ROLE)
    {
        name = name_;
        symbol = symbol_;
    }

    //-------------------------------------------------------

    // Manage Token URIs
    string internal baseTokenURI;
    string internal baseTokenURI_EXT;
    string internal universalBaseTokenURI;
    mapping(uint256 => string) internal tokenIdToTokenURI;

    //dynamic token address: option 1
    function setBaseTokenURI(string memory uri_, string memory ext_)
        external
        onlyRole(ADMIN_ROLE)
    {
        baseTokenURI = uri_;
        baseTokenURI_EXT = ext_;
    }

    //universal base address: option 2
    function setUniversalBaseTokenURI(string memory uri_)
        external
        onlyRole(ADMIN_ROLE)
    {
        universalBaseTokenURI = uri_;
    }

    //harded-coded token adress: option 3
    function setTokenIdToTokenURI(uint256 tokenId_, string memory uri_)
        external
        onlyRole(ADMIN_ROLE)
    {
        tokenIdToTokenURI[tokenId_] = uri_;
    }

    //default to dynamic uri with assumption that all (initial) tokens will reside at the same ipfs CID
    uint256 public tokenURIOption = 1;

    function setTokenURIOption(uint256 option_) external onlyRole(ADMIN_ROLE) {
        tokenURIOption = option_;
    }

    function uri(uint256 tokenId_)
        public
        view
        override
        returns (string memory)
    {
        // Options System for Future Compatibility
        if (tokenURIOption == 1) {
            return
                string(
                    abi.encodePacked(
                        baseTokenURI,
                        _toString(tokenId_),
                        baseTokenURI_EXT
                    )
                );
        } else if (tokenURIOption == 2) {
            return universalBaseTokenURI;
        } else if (tokenURIOption == 3) {
            return tokenIdToTokenURI[tokenId_];
        } else {
            return tokenIdToTokenURI[tokenId_];
        }
    }

    //-------------------------------------------------------
    //Manage Events
    event SingleToSingle(address to_, uint256 id_, uint256 amount_);
    event ManyToSingle(address to_, uint256[] ids_, uint256[] amounts_);
    event SingleToMany(address[] tos_, uint256 id_, uint256 amount_);
    event ManyToMany(address[] tos_, uint256[] ids_, uint256[] amounts_);

    // Manage Minting
    function toastSingleToSingle(
        address to_,
        uint256 id_,
        uint256 amount_,
        bytes memory data_
    ) external {
        require(!paused, "the contract is paused");
        require(amount_ > 0, "need to mint at least 1 NFT");

        uint256 supply = totalSupply(id_);
        //only check against max supply if the token's max supply has been set
        if (tokenIdtoTokenMaxSupply[id_] > 0) {
            require(
                supply + amount_ <= tokenIdtoTokenMaxSupply[id_],
                "max NFT limit exceeded"
            );
        }

        if (onlyAdmins == true) {
            require(hasRole(ADMIN_ROLE, msg.sender));
            //require(isAdmin(msg.sender), "user is not an admin");
        }

        _mint(to_, id_, amount_, data_);
        emit SingleToSingle(to_, id_, amount_);
    }

    function toastManyToSingle(
        address to_,
        uint256[] memory ids_,
        uint256[] memory amounts_,
        bytes memory data_
    ) external {
        require(!paused, "the contract is paused");

        //check if max supply for each token will be exceeded
        for (uint256 i = 0; i < ids_.length; i++) {
            uint256 supply = totalSupply(ids_[i]);
            if (tokenIdtoTokenMaxSupply[ids_[i]] > 0) {
                require(
                    supply + amounts_[i] <= tokenIdtoTokenMaxSupply[ids_[i]],
                    "max NFT limit exceeded"
                );
            }
        }

        if (onlyAdmins == true) {
            require(hasRole(ADMIN_ROLE, msg.sender));
            //require(isAdmin(msg.sender), "user is not an admin");
        }

        //mint
        _mintBatch(to_, ids_, amounts_, data_);
        emit ManyToSingle(to_, ids_, amounts_);
    }

    function toastSingleToMany(
        address[] memory tos_,
        uint256 id_,
        uint256 amount_,
        bytes memory data_
    ) external {
        require(!paused, "the contract is paused");
        require(amount_ > 0, "need to mint at least 1 NFT");

        uint256 supply = totalSupply(id_);
        //only check against max supply if the token's max supply has been set
        if (tokenIdtoTokenMaxSupply[id_] > 0) {
            require(
                supply + (amount_ * tos_.length) <=
                    tokenIdtoTokenMaxSupply[id_],
                "max NFT limit exceeded"
            );
        }

        if (onlyAdmins == true) {
            require(hasRole(ADMIN_ROLE, msg.sender));
            //require(isAdmin(msg.sender), "user is not an admin");
        }

        //mint
        for (uint256 i = 0; i < tos_.length; i++) {
            _mint(tos_[i], id_, amount_, data_);
        }
        emit SingleToMany(tos_, id_, amount_);
    }

    function toastManyToMany(
        address[] memory tos_,
        uint256[] memory ids_,
        uint256[] memory amounts_,
        bytes memory data_
    ) external {
        require(!paused, "the contract is paused");
        require(
            tos_.length == ids_.length && tos_.length == amounts_.length,
            "airdropSingleToMany: Array lengths mismatch!"
        );

        //check if max supply for each token will be exceeded
        for (uint256 i = 0; i < ids_.length; i++) {
            uint256 supply = totalSupply(ids_[i]);
            if (tokenIdtoTokenMaxSupply[ids_[i]] > 0) {
                require(
                    supply + amounts_[i] <= tokenIdtoTokenMaxSupply[ids_[i]],
                    "max NFT limit exceeded"
                );
            }
        }

        if (onlyAdmins == true) {
            require(hasRole(ADMIN_ROLE, msg.sender));
            //require(isAdmin(msg.sender), "user is not an admin");
        }
        //mint
        for (uint256 i = 0; i < tos_.length; i++) {
            _mint(tos_[i], ids_[i], amounts_[i], data_);
        }
        emit ManyToMany(tos_, ids_, amounts_);
    }

    //-------------------------------------------------------

    //Exchange Functionality

    mapping(uint256 => uint256[]) internal NewToBurnable;

    function setNewToBurnableMapping(
        uint256 tokenId_,
        uint256[] calldata burnable_
    ) external onlyRole(ADMIN_ROLE) {
        //add require statements

        NewToBurnable[tokenId_] = burnable_;
    }

    function getNewToBurnableMapping(uint256 tokenId_)
        public
        view
        returns (uint256[] memory)
    {
        return NewToBurnable[tokenId_];
    }

    function checkExchangeQualification(address account_, uint256 tokenIdNew_)
        public
        view
        returns (bool)
    {
        bool qualified = false;

        uint256[] memory tokensRequired = NewToBurnable[tokenIdNew_];

        for (uint256 i = 0; i < tokensRequired.length; i++) {
            if (!(IERC1155(this).balanceOf(account_, tokensRequired[i]) > 0)) {
                qualified = false;
                break;
            } else {
                qualified = true;
            }
        }

        return qualified;
    }

    //exchange array of tokens for new token
    function exchange(
        address account_,
        uint256 tokenIdNew_,
        uint256[] memory currentTokens,
        uint256[] memory currentTokenCounts,
        bytes memory data_
    ) public virtual {
        require(!paused, "the contract is paused");
        require(
            account_ == _msgSender() ||
                isApprovedForAll(account_, _msgSender()),
            "caller is not owner nor approved"
        );

        //TODO: add require statements to check token counts arent zero, etc.

        //require the account qualies for new token based on balanceOf, not existing tokens passed in
        require(
            checkExchangeQualification(account_, tokenIdNew_),
            "account does not qualify for new token"
        );

        //require that the tokens passed in are the correct tokens to exchange based on the mapping
        //TODO: refactoring opportunity

        uint256[] memory tokensRequired = NewToBurnable[tokenIdNew_];

        for (uint256 i = 0; i < tokensRequired.length; i++) {
            if (!(currentTokens[i] == tokensRequired[i])) {
                revert(
                    "user qualifies for new token, but correct tokens were not passed in"
                );
            }
        }

        _mint(account_, tokenIdNew_, 1, data_);
        _burnBatch(account_, currentTokens, currentTokenCounts);
    }

    //-------------------------------------------------------

    // Burnable
    function burn(
        address account,
        uint256 id,
        uint256 value
    ) public virtual {
        require(!paused, "the contract is paused");
        require(
            account == _msgSender() || isApprovedForAll(account, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );
        _burn(account, id, value);
    }

    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory values
    ) public virtual {
        require(!paused, "the contract is paused");
        require(
            account == _msgSender() || isApprovedForAll(account, _msgSender()),
            "ERC1155: caller is not owner nor approved"
        );
        _burnBatch(account, ids, values);
    }

    function withdraw() public payable onlyRole(ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
