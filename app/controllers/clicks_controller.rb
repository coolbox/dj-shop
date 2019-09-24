# frozen_string_literal: true

class ClicksController < ApplicationController
  def create
    Click.create(post_params)
    render json: {}, status: :ok
  end

  private

  def post_params
    {
      user_uid: current_user.uid,
      trackProvider: params.delete(:trackProvider),
      data: params
    }
  end
end
