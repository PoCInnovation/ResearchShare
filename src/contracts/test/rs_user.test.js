const ResearchShare = artifacts.require("ResearchShare")

contract("User", (accounts) => {
    let instance = {};
    before(async () => {
        instance = await ResearchShare.deployed();
        await instance.registerUser("John", "Doe", ["spy", "murder", "poison"])
    });
    it('User creation', async () => {
        let user = await instance.getUser.call()
        assert.equal(user.firstname, "John", "Invalid user firstname")
        assert.equal(user.lastname, "Doe", "Invalid user lastname")
        assert.equal(user.fields.length, 3, "Found unexpected field(s)")
    });
})