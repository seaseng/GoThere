class ExpediaController < ApplicationController
  
  def search
    require "expedia"
    
    Expedia.cid = 55505
    Expedia.api_key = ENV['EXPEDIA_KEY']
    Expedia.shared_secret = ENV['EXPEDIA_SECRET']
    Expedia.currency_code = 'USD'
    Expedia.minor_rev = 13

    api = Expedia::Api.new

<<<<<<< HEAD
    @response = api.get_list({city: params[:search], useGeoCoder: true, minTripAdvisorRating: 3.0,})

    # response = api.get_list({arrivalDate:"02/22/2014 ",destinationString: "San Francisco, CA USA", numberOfResults: 30, searchradius: 10, sort: "PROMO"})
    # binding.pry

    render :json => response.to_json
=======
    response = api.get_list({city: params[:search], useGeoCoder: true, minTripAdvisorRating: 3.0})
    unless response.inspect.include? "APIError"
      render :json => response.body['HotelListResponse']['HotelList']['HotelSummary'].to_json
    else
      render :json => { error: true }
    end

>>>>>>> 51d9d4715ea442e09f88a9088ad62dbd568efcc6
    # redirect_to :back
  end

  def arc_map

  # Convert lat/lon (must be in radians) to Cartesian coordinates for each location.
  # X = cos(lat) * cos(lon)
  # Y = cos(lat) * sin(lon)
  # Z = sin(lat)

  # Compute average x, y and z coordinates.
  # x = (x1 + x2 + ... + xn) / n
  # y = (y1 + y2 + ... + yn) / n
  # z = (z1 + z2 + ... + zn) / n

  # Convert average x, y, z coordinate to latitude and longitude.
  # Lon = atan2(y, x)
  # Hyp = sqrt(x * x + y * y)
  # Lat = atan2(z, hyp)
    
  # @response.body['HotelListResponse']['HotelList']['HotelSummary']



  end

end
