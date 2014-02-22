require 'spec_helper'

describe "User session", js: true do

  let!(:user) { FactoryGirl.create(:user)  }


  it "User can login and start session" do 
    visit new_user_session_path
    expect(page).to have_content("Sign in")
    expect(page).to have_content("Email")
    expect(page).to have_content("Password")
    expect(page).to have_content("Sign up")
    fill_in "Email", :with => user.email
    fill_in "Password", :with => user.password
    click_button "Sign in"
    expect(page).to have_content 'Signed in successfully.'
  end

  it "User can't start session with wrong password" do 
    visit new_user_session_path
    expect(page).to have_content("Sign in")
    expect(page).to have_content("Email")
    expect(page).to have_content("Password")
    expect(page).to have_content("Sign up")
    fill_in "Email", :with => user.email
    fill_in "Password", :with => 'fake-password'
    click_button "Sign in"
    expect(page).to have_content 'Invalid email or password.'
  end

  it "User can't begin session with wrong email" do 
    visit new_user_session_path
    expect(page).to have_content("Sign in")
    expect(page).to have_content("Email")
    expect(page).to have_content("Password")
    expect(page).to have_content("Sign up")
    fill_in "Email", :with => 'fake-email@fake.com'
    fill_in "Password", :with => 'fake-password'
    click_button "Sign in"
    expect(page).to have_content 'Invalid email or password.'
  end

  it "User can log out when they have an active session" do
    login(user)
    click_link("Logout")
    expect(page).to have_content("Signed out successfully.")
  end

  it "User can update their email" do
    login(user)
    click_link 'Edit profile'
    fill_in "Email", :with => user.email
    fill_in "Current password", :with => user.password
    click_button "Update"
    expect(page).to have_content("You updated your account successfully.")

  end

  it "User can cancel their account" do
    pending
    login(user)
    click_link 'Edit profile'
    click_button('Cancel my account')
    alert = page.driver.browser.switch_to.alert
    alert.accept
    expect(page).to have_content("Bye! Your account was successfully cancelled. We hope to see you again soon.")
  end


end

describe "User registration", js: true do
  let!(:user) { FactoryGirl.build(:user)  }
  
  it "user can create a new account" do
    visit new_user_registration_path
    fill_in "Email", :with => user.email
    fill_in "Password", :with => user.password
    fill_in "Password confirmation", :with => user.password_confirmation
    click_button "Sign up"
    expect(page).to have_content("Welcome! You have signed up successfully.")
  end

  it "user cannot create account if password is not confirmed" do 
    visit new_user_registration_path
    fill_in "Email", :with => user.email
    fill_in "Password", :with => user.password
    click_button "Sign up"
    expect(page).to have_content("Sign up")
  end

end