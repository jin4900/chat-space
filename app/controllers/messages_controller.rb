class MessagesController < ApplicationController
  def index
    @messages = Message.new
    @messages = Message.all
  end

end
