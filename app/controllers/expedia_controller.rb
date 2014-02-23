class ExpediaController < ApplicationController
  
  def search
    require "expedia"
    
    Expedia.cid = 55505
    Expedia.api_key = ENV['EXPEDIA_KEY']
    Expedia.shared_secret = ENV['EXPEDIA_SECRET']
    Expedia.currency_code = 'USD'
    Expedia.minor_rev = 13

    api = Expedia::Api.new

    response = api.get_list({city: params[:search], useGeoCoder: true, minTripAdvisorRating: 3.0})
    unless response.inspect.include? "APIError"
      render :json => response.body['HotelListResponse']['HotelList']['HotelSummary'].to_json
    else
      render :json => { error: true }
    end

    # redirect_to :back
  end

end
