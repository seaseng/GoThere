require 'spec_helper'

describe User do
  let!(:user) {create(:user)}
  it { should validate_presence_of(:email)}  
  it "should have correct saved email" do
    expect(user.email).to eq 'test1@test.com'
  end
end