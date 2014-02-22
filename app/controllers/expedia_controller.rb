class ExpediaController < ApplicationController
  def new
    require "expedia"
      
    Expedia.cid = 55505
    Expedia.api_key = 'xxxx'
    Expedia.shared_secret = 'xxxx'
    Expedia.locale = 'en_US'
    Expedia.currency_code = 'USD'
    Expedia.minor_rev = 13

    api = Expedia::Api.new

    response = api.get_list({address: "30 Germania St, Boston, MA 02130}"})

    response = api.get_list({arrivalDate:"02/22/2014 ",destinationString: "San Francisco, CA USA", numberOfResults: 30, searchradius: 10, sort: "PROMO"})
    #
    # expect JSON response
    # render JSON 
    render json: response.to_json
  end
end
