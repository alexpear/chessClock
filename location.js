// Each card is in one of these places

class Location {
    constructor (zone, player, x, y) {
        this.zone = zone || Location.ZONE.exile;
        this.player = player;
        this.x = x;
        this.y = y;
    }
}

Location.ZONE = {
    deckTop: 'deckTop',
    desk: 'desk',
    board: 'board',
    discard: 'discard',
    exile: 'exile'
};

module.exports = Location;
