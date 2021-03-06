import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import classnames from 'classnames'

import Favorite from '../common/favorite'
import { doRedirect, addFavorite } from '../../actions'
import { getUserId } from '../../reducers'

const styles = theme => ({
  card: {
    maxWidth: 500,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
});


class ShopPreview extends React.Component {
  state = { expanded: false }

  handleExpandClick = () => this.setState(state => ({ expanded: !state.expanded }));
  onFavoriteClick = () => this.props.addFavorite(this.props.userId, this.props.shop.id)

  render() {
    const {shop, isShowFavorites, onMouseOverShop, onMouseOut, classes, doRedirect} = this.props
    return (
        <div
          onMouseOver={ () => onMouseOverShop(shop.id) }
          onMouseOut={ onMouseOut }
        >
          <Card className={classes.card}>
            <CardContent>
              <div style={{display: 'inline-block', verticalAlign:'top'}}>
                <Typography gutterBottom variant="subheading">
                  { shop.name }
                </Typography>
                <Typography component="p">
                  { shop.address }
                </Typography>
              </div>
              <div style={{display: 'inline-block', verticalAlign:'top', float:'right'}}>
                <img alt="" width="90" src="http://thefader-res.cloudinary.com/private_images/w_2400,c_limit,f_auto,q_auto:best/40380002_WEB_gmcgws/levels-barbershop-new-york-ny.jpg"/>
              </div>
            </CardContent>

            <CardActions className={classes.actions} disableActionSpacing>
              <Favorite
                onFavoriteClick={this.onFavoriteClick}
                favorited={shop.favorited}
                isShowFavorites={isShowFavorites}
              />
              <Button size="small" color="primary" onClick={() => doRedirect(`/shop/${shop.id}`)}>
                Show More
              </Button>
              <IconButton
                className={classnames(classes.expand, {
                  [ classes.expandOpen ]: this.state.expanded,
                })}
                onClick={ this.handleExpandClick }
                aria-expanded={ this.state.expanded }
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>

            <Collapse in={ this.state.expanded } timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                   { shop.description }
                </Typography>
                <Typography paragraph>
                  { shop.services }
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  userId: getUserId(state)
})

const mapDispatchToProps = dispatch => ({
  doRedirect: redirectTo => dispatch(doRedirect(redirectTo)),
  addFavorite: (userId, shopId) => dispatch(addFavorite(userId, shopId))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ShopPreview))
