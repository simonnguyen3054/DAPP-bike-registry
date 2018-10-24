const $store_address = $('#store-address');
const $store_address_balance = $('#store-address-balance');
const $bike_id_input = $('#bike-id-input');
const $add_bike_button = $('.add-bike-registry');
const $bikeList = $('.list-group');

//add bike to page (add to page only, not registered to ethereum network yet)
function addBikeToBeRegistered(bike_id){

  let bikeAddedLi = $(`<li class="list-group-item d-flex justify-content-between                                    align-items-center">
                          <strong>Ethereum Address:</strong>
                          <span class="btn btn-warning">This bike has not registered!</span>
                          |
                          <strong>Bike Identification Number:</strong>
                          <span class="btn btn-info">${bike_id}</span>

                          <span class="badge badge-dark">Register</span>
                          <span class="badge badge-dark">Transfer</span>
                      </li>`);

  $bikeList.prepend(bikeAddedLi);
}

App = {
    web3Provider: null,
    contracts: {},

    init: function() {
        return App.initWeb3();
    },

    initWeb3: function() {
        // Initialize web3 and set the provider to the testRPC.
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
            web3 = new Web3(App.web3Provider);
        }

        return App.initContract();
    },

    initContract: function() {
        $.getJSON('BikeRegistry.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            var DonateArtifact = data;
            App.contracts.BikeRegistry = TruffleContract(DonateArtifact);

            // Set the provider for our contract.
            App.contracts.BikeRegistry.setProvider(App.web3Provider);

            return App.bindEvents();

        });
    },
    bindEvents: function() {

      $add_bike_button.on('click', App.addBike)

        //add the bike store address to the page
        var store_account = web3.eth.accounts[0];
        $store_address.text("Store Address: " + store_account);

        //add the balance of the store address to the page
        var balance;
        web3.eth.getBalance(store_account, function(err, bal){
            balance = web3.fromWei(bal.toNumber());
            //add how much you have to the page
            $store_address_balance.text("Balance: " + balance);
        });

        // var accountInterval = setInterval(function() {

        //     //if the account changes then re-run App.init
        //         var acc = web3.eth.accounts[0];

        //         if (account !== acc) {
        //             account = web3.eth.accounts[0];

        //             //reset elements on the page
        //             $errors.empty();
        //             $transactions.empty();
        //             $donationInfo.empty();
        //             $ownerSees.addClass('hide');
        //             $ownerSeesAdditionalInfo.empty();
        //             $donationAmount.val('');
        //             $transferToAddress.val('');

        //             App.init();
        //         }

        //     //if the balance changed of the account then update the page with the new balance of the account
        //         web3.eth.getBalance(account, function(err, bal){
        //             if (balance !== web3.fromWei(bal.toNumber())){
        //                 balance = web3.fromWei(bal.toNumber());
        //                 //add how much you have to the page
        //                 $yourETHAmount.text(balance);
        //             }
        //         });
        // }, 100);

        return App.grabState();
    },
    addBike: function(event) {
      event.preventDefault();

      let bike_id = $bike_id_input.val();
      addBikeToBeRegistered(bike_id);
    }
};

$(function() {
    $(window).load(function() {
        App.init();
    });
});