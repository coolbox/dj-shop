# frozen_string_literal: true

class ClicksController < ApplicationController
  skip_before_action :authenticate, only: [:index]

  def index
    @clicks = Click.order(created_at: :desc).limit(10).map(&:data_sample)
    render json: @clicks, status: :ok
  end

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
