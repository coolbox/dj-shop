class BaseController < ApplicationController
  def index
    @body_id = "homepage"

    respond_to do |format|
      format.html
    end
  end
end
