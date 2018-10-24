import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

pragma solidity ^0.4.18;

contract BikeRegistry is Ownable { //extends Ownable contract

  //define a struct variable to hold the bike's owner information
  struct bike {
    string first_name;
    string last_name;
    string email;
    string BIN; //BIN is the "bike identification number"
  }

  //map an address to the bikeoOwner struct
  mapping (address => bike) bikes;

  //create an address array to store all the bike addresses
  address[] public bikeAccounts;

  //create an event for when bike is registered
  event NewBike(
    address bikeOwner
  );

  //Add bike to mapping
  function registerBike(address _address, string _first_name, string _last_name, string _email, string _BIN) public {
    //requires: 1)contract owner 2)_BIN must be unique

    //set a variable that bind to the bikes mapping. Use memory for struct
    bike memory newBike = bikes[_address];

    //set the values to the newBike variable
    newBike.first_name = _first_name;
    newBike.last_name = _last_name;
    newBike.email = _email;
    newBike.BIN = _BIN;

    //pushing the address to the the bikeAccounts address array
    bikeAccounts.push(_address);

    emit NewBike(_address);
  }

  //returns the length of the bikeAccounts address array
  //can only be called outside of this contract
  function getBikeLength() external view returns (uint256) {
    return bikeAccounts.length;
  }



  //get the bike
  //First we need to create a function to retrieve the addresses from the bikeAccounts address array

  // function getBike(address bikeOwnerAddress) external view returns (string _first_name, string _last_name, string _email, string _BIN) {
  //   //anyone can see which bike belongs to which ethereum address
  //   //require is not necessary

  //   //since we map struct bike to an address we need to use memory in the function
  //   bike memory b = bikes[bikeOwnerAddress];

  //   //return b
  //   return (b.first_name, b.last_name, b.email, b.BIN);
  // }
}