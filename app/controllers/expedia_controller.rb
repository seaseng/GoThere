class ExpediaController < ApplicationController
  
  def new
    require "expedia"
    
    Expedia.cid = 55505
    Expedia.api_key = ENV['EXPEDIA_KEY']
    Expedia.shared_secret = ENV['EXPEDIA_SECRET']
    Expedia.currency_code = 'USD'
    Expedia.minor_rev = 13

    api = Expedia::Api.new

    response = api.get_list({city: params[:search], useGeoCoder: true, minTripAdvisorRating: 3.0,})

    # response = api.get_list({arrivalDate:"02/22/2014 ",destinationString: "San Francisco, CA USA", numberOfResults: 30, searchradius: 10, sort: "PROMO"})

    render :json => response.to_json
    # redirect_to :back
  end

end
