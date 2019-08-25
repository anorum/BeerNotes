import React, { useState } from 'react';
import styled from "styled-components"
import PropTypes from 'prop-types';
import RecipeStat from "./RecipeStat"

const Container = styled.div`
display: flex;
justify-content: space-between
`

const RecipeStats = props => {

    const [originalGravity, setOriginalGravity] = useState()

    return (
        <Container>
            <RecipeStat stat="Original Gravity" value={originalGravity} />
        </Container>
    );
};

RecipeStats.propTypes = {
    
};

export default RecipeStats;